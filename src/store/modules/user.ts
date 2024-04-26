import { defineStore } from "pinia";
import {
  type userType,
  store,
  router,
  resetRouter,
  routerArrays,
  storageLocal
} from "../utils";
import {
  type UserResult,
  type RefreshTokenResult,
  getLogin,
  refreshTokenApi
} from "@/api/user.bak";
import { useMultiTagsStoreHook } from "./multiTags";
import { setToken, removeToken, TOKEN, USERNAME } from "@/utils/auth";
import { login } from "@/api/user";

export const useUserStore = defineStore({
  id: "user",
  state: (): userType => ({
    // 用户名
    username: storageLocal().getItem<string>(USERNAME) ?? "",
    // token
    token: storageLocal().getItem<string>(TOKEN) ?? "",
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(payload: string) {
      this.username = payload;
      storageLocal().setItem(USERNAME, payload);
    },
    /** 存储token */
    SET_TOKEN(payload: string) {
      this.token = payload;
      storageLocal().setItem(TOKEN, payload);
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data?.success) setToken(data.data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /** 登入 */
    async loginUser(data: User.loginParams) {
      try {
        const res = await login(data);
        setToken(res.data);
        return res.data;
      } catch (e) {
        return e;
      }
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [ ...routerArrays ]);
      resetRouter();
      router.push("/login");
    },
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}

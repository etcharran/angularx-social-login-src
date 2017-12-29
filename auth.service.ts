import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/user';

export interface AuthServiceConfigItem {
  id: string;
  provider: LoginProvider;
}

export class AuthServiceConfig {
  providers: Map<string, LoginProvider> = new Map<string, LoginProvider>();

  constructor(providers: AuthServiceConfigItem[]) {
    for (let i = 0; i < providers.length; i++) {
      let element = providers[i];
      this.providers.set(element.id, element.provider);
    }
  }
}

@Injectable()
export class AuthService {

  private static readonly ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
  private static readonly ERR_NOT_LOGGED_IN = 'Not logged in';

  private providers: Map<string, LoginProvider>;

  private _user: SocialUser = null;
  private _authState: BehaviorSubject<SocialUser> = new BehaviorSubject(null);

  get authState(): Observable<SocialUser> {
    return this._authState.asObservable();
  }

  constructor(config: AuthServiceConfig) {
    this.providers = config.providers;

    this.providers.forEach((provider: LoginProvider, key: string) => {
      provider.initialize().then((user: SocialUser) => {
        user.provider = key;

        this._user = user;
        this._authState.next(user);
      }).catch((err) => {
        // this._authState.next(null);
      });
    });
  }

  signIn(providerId: string): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      let providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.signIn().then((user: SocialUser) => {
          user.provider = providerId;
          resolve(user);

          this._user = user;
          this._authState.next(user);
        });
      } else {
        reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this._user) {
        reject(AuthService.ERR_NOT_LOGGED_IN);
      } else {
        let providerId = this._user.provider;
        let providerObject = this.providers.get(providerId);
        if (providerObject) {
          providerObject.signOut().then(() => {
            resolve();

            this._user = null;
            this._authState.next(null);
          });
        } else {
          reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
        }
      }
    });
  }

}

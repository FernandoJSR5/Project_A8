import { Stitch, StitchAppClient, RemoteMongoDatabase, UserPasswordCredential, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';
import { Injectable, Inject } from '@angular/core'
import { IStitchConfig } from './stitch-config.interface';

@Injectable({
	providedIn: 'root'
})
export class StitchService {
	public client: StitchAppClient;
	public database: RemoteMongoDatabase;
	public credential: UserPasswordCredential;
	
	constructor(@Inject('config') private config: IStitchConfig) {
		this.client = Stitch.hasAppClient(this.config.appId) ? Stitch.getAppClient(this.config.appId) : Stitch.initializeAppClient(this.config.appId);
		this.database = this.client.getServiceClient(RemoteMongoClient.factory, this.config.serviceName).db(this.config.dbName);
		this.credential = new UserPasswordCredential("", "");
	}

	hasLoggedInUser() {
		return this.client.auth.isLoggedIn;
	}

	getCurrentUser() {
		return this.client.auth.isLoggedIn ? this.client.auth.user : null;
	}

	logoutCurrentUser() {
		const user = this.getCurrentUser();
		if(user) {
			return this.client.auth.removeUserWithId(user.id);
		}
	}
	
}
import { NgModule, ModuleWithProviders } from '@angular/core';
import { StitchComponent } from './stitch.component';
import { StitchService } from './stitch.service';
import { IStitchConfig } from './stitch-config.interface';

@NgModule({
	declarations: [StitchComponent],
	imports: [],
	exports: [StitchComponent]
})
export class StitchModule {
	static forRoot(stitchConfig: IStitchConfig): ModuleWithProviders {
		return {
			ngModule: StitchModule,
			providers: [StitchService, {provide: 'config', useValue: stitchConfig}]
		};
	}
}
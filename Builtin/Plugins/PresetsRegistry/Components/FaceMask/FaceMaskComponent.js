import { Preset } from 'LensStudio:Preset';
import { FaceMaskMaterialPreset } from '../../Assets/FaceMaskMaterial/FaceMaskMaterial.js';

export async function createFaceMaskComponent(model, destinationObject) {
    const faceMask = destinationObject.addComponent('FaceMaskVisual');

    const materialPreset = new FaceMaskMaterialPreset(this.pluginSystem);
    faceMask.mainMaterial = await materialPreset.createAsync();

    return faceMask;
}

export class FaceMaskComponentPreset extends Preset {
    static descriptor() {
        return {
            id: 'Com.Snap.FaceMaskComponentPreset',
            name: 'Face Mask',
            description: '',
            icon: Editor.Icon.fromFile(import.meta.resolve('Resources/FaceMask.svg')),
            section: 'Face',
            entityType: 'FaceMaskVisual'
        };
    }
    constructor(pluginSystem) {
        super(pluginSystem);
    }
    async createAsync(destination) {
        const model = this.pluginSystem.findInterface(Editor.Model.IModel);
        return await createFaceMaskComponent.call(this, model, destination);
    }
}

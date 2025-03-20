import { Preset } from 'LensStudio:Preset';
import { FaceInsetMaterialPreset } from '../../Assets/FaceInsetMaterial/FaceInsetMaterial.js';

export async function createFaceInsetComponent(model, destinationObject) {
    const faceInset = destinationObject.addComponent('FaceInsetVisual');

    const faceInsetPreset = new FaceInsetMaterialPreset(this.pluginSystem);
    faceInset.mainMaterial = await faceInsetPreset.createAsync();

    faceInset.faceRegion = Editor.Components.FaceInsetRegion.Mouth;

    return faceInset;
}

export class FaceInsetComponentPreset extends Preset {
    static descriptor() {
        return {
            id: 'Com.Snap.FaceInsetComponentPreset',
            name: 'Face Inset',
            description: '',
            icon: Editor.Icon.fromFile(import.meta.resolve('Resources/FaceInset.svg')),
            section: 'Face',
            entityType: 'FaceInsetVisual'
        };
    }
    constructor(pluginSystem) {
        super(pluginSystem);
    }
    async createAsync(destination) {
        const model = this.pluginSystem.findInterface(Editor.Model.IModel);
        return await createFaceInsetComponent.call(this, model, destination);
    }
}

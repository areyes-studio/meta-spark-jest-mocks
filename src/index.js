jest.mock(
	'Diagnostics',
	() => {
		const DiagnosticsMock = jest.requireActual('./Diagnostics.mock.js');
		return DiagnosticsMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'CameraInfo',
	() => {
		const CameraInfoMock = jest.requireActual('./CameraInfo.mock.js');
		return CameraInfoMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Reactive',
	() => {
		const ReactiveMock = jest.requireActual('./Reactive/Reactive.mock.js');
		return ReactiveMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Animation',
	() => {
		const AnimationMock = jest.requireActual('./Animation/Animation.mock.js');
		return AnimationMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Time',
	() => {
		const TimeMock = jest.requireActual('./Time.mock.js');
		return TimeMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Scene',
	() => {
		const SceneMock = jest.requireActual('./Scene/SceneModule.mock.js');
		return SceneMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Textures',
	() => {
		const TexturesMock = jest.requireActual('./Textures/Textures.mock.js');
		return TexturesMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Materials',
	() => {
		const MaterialsMock = jest.requireActual('./Materials/Materials.mock.js');
		return MaterialsMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Patches',
	() => {
		const PatchesMock = jest.requireActual('./Patches/Patches.mock.js');
		return PatchesMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Persistence',
	() => {
		const PersistenceMock = jest.requireActual('./Persistence/Persistence.mock.js');
		return PersistenceMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Multipeer',
	() => {
		const MultipeerMock = jest.requireActual('./Multipeer.mock.js');
		return MultipeerMock.default;
	},
	{ virtual: true },
);


jest.mock(
	'Blocks',
	() => {
		const BlocksMock = jest.requireActual('./Blocks.mock.js');
		return BlocksMock.default;
	},
	{ virtual: true },
);

export { AnimationMock } from "./Animation/Animation.mock";
export { TimeDriverMock } from "./Animation/TimeDriver.mock";

export { MaterialBaseMock } from "./Materials/MaterialBase.mock";
export { MaterialsMock } from "./Materials/Materials.mock";

export { PatchesMock } from "./Patches/Patches.mock";
export { PatchesInputsMock } from "./Patches/PatchesInputs.mock";
export { PatchesOuputsMock } from "./Patches/PatchesOutputs.mock";

export { PersistenceMock } from "./Persistence/Persistence.mock";
export { StorageLocationMock } from "./Persistence/StorageLocation.mock";

export { BoolSignalMock } from "./Reactive/BoolSignal.mock";
export { EventSourceMock } from "./Reactive/EventSource.mock";
export { Mat4Mock } from "./Reactive/Mat4.mock";
export { QuaternionSignalMock } from "./Reactive/QuaternionSignal.mock";
export { ReactiveMock } from "./Reactive/Reactive.mock";
export { ScalarSignalMock } from "./Reactive/ScalarSignal.mock";
export { SignalMock } from "./Reactive/Signal.mock";
export { ScalarSignalSourceMock, StringSignalSourceMock, BoolSignalSourceMock } from "./Reactive/SignalSource.mock";
export { StringSignalMock } from "./Reactive/StringSignal.mock";
export { SubscriptionMock } from "./Reactive/Subscription.mock";
export { TransformSignalMock } from "./Reactive/TransformSignal.mock";
export { Vec2SignalMock } from "./Reactive/Vec2Signal.mock";
export { VectorSignalMock } from "./Reactive/VectorSignal.mock";

export { SceneMock } from "./Scene/SceneModule.mock";
export { SceneObjectBaseMock } from "./Scene/SceneObjectBase.mock";

export { TextureBaseMock } from "./Textures/TextureBase.mock";
export { TexturesMock } from "./Textures/Textures.mock";

export { BlocksMock } from "./Blocks.mock";
export { CameraInfoModuleMock } from "./CameraInfo.mock";
export { DiagnosticsMock } from "./Diagnostics.mock";
export { MultipeerMock } from "./Multipeer.mock";
export { ParticipantsMock } from "./Participants.mock";
export { TimeMock } from "./Time.mock";
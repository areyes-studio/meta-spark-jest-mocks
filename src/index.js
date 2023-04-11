import DiagnosticsMock from "./Diagnostics.mock";
import CameraInfoMock from "./CameraInfo.mock";
import ReactiveMock from "./Reactive/Reactive.mock";
import AnimationMock from "./Animation/Animation.mock";
import TimeMock from "./Time.mock";
import SceneMock from "./Scene/SceneModule.mock";
import TexturesMock from "./Textures/Textures.mock";
import MaterialsMock from "./Materials/Materials.mock";
import PatchesMock from "./Patches/Patches.mock";
import PersistenceMock from "./Persistence/Persistence.mock";
import MultipeerMock from "./Multipeer.mock";
import BlocksMock from "./Blocks.mock";

jest.mock(
	'Diagnostics',
	() => DiagnosticsMock,
	{ virtual: true },
);

jest.mock(
	'CameraInfo',
	() => CameraInfoMock,
	{ virtual: true },
);

jest.mock(
	'Reactive',
	() => ReactiveMock,
	{ virtual: true },
);

jest.mock(
	'Animation',
	() => AnimationMock,
	{ virtual: true },
);

jest.mock(
	'Time',
	() => TimeMock,
	{ virtual: true },
);

jest.mock(
	'Scene',
	() => SceneMock,
	{ virtual: true },
);

jest.mock(
	'Textures',
	() => TexturesMock,
	{ virtual: true },
);

jest.mock(
	'Materials',
	() => MaterialsMock,
	{ virtual: true },
);

jest.mock(
	'Patches',
	() => PatchesMock,
	{ virtual: true },
);

jest.mock(
	'Persistence',
	() => PersistenceMock,
	{ virtual: true },
);

jest.mock(
	'Multipeer',
	() => MultipeerMock,
	{ virtual: true },
);


jest.mock(
	'Blocks',
	() => BlocksMock,
	{ virtual: true },
);

export { AnimationMock as Animation } from "./Animation/Animation.mock";
export { TimeDriverMock as TimeDriver} from "./Animation/TimeDriver.mock";

export { MaterialBaseMock as MaterialBase} from "./Materials/MaterialBase.mock";
export { MaterialsMock as Materials} from "./Materials/Materials.mock";

export { PatchesMock as Patches} from "./Patches/Patches.mock";
export { PatchesInputsMock as PatchesInputs} from "./Patches/PatchesInputs.mock";
export { PatchesOuputsMock as PatchesOuputs} from "./Patches/PatchesOutputs.mock";

export { PersistenceMock as Persistence} from "./Persistence/Persistence.mock";
export { StorageLocationMock as StorageLocation} from "./Persistence/StorageLocation.mock";

export { BoolSignalMock as BoolSignal} from "./Reactive/BoolSignal.mock";
export { EventSourceMock as EventSource} from "./Reactive/EventSource.mock";
export { Mat4Mock as Mat4} from "./Reactive/Mat4.mock";
export { QuaternionSignalMock as QuaternionSignal} from "./Reactive/QuaternionSignal.mock";
export { ReactiveMock as Reactive} from "./Reactive/Reactive.mock";
export { ScalarSignalMock as ScalarSignal} from "./Reactive/ScalarSignal.mock";
export { SignalMock as Signal} from "./Reactive/Signal.mock";
export { ScalarSignalSourceMock as ScalarSignalSource, StringSignalSourceMock as StringSignalSource, BoolSignalSourceMock as BoolSignalSource} from "./Reactive/SignalSource.mock";
export { StringSignalMock as StringSignal} from "./Reactive/StringSignal.mock";
export { SubscriptionMock as Subscription} from "./Reactive/Subscription.mock";
export { TransformSignalMock as TransformSignal} from "./Reactive/TransformSignal.mock";
export { Vec2SignalMock as Vec2Signal} from "./Reactive/Vec2Signal.mock";
export { VectorSignalMock as VectorSignal} from "./Reactive/VectorSignal.mock";

export { SceneMock as Scene} from "./Scene/SceneModule.mock";
export { SceneObjectBaseMock as SceneObjectBase} from "./Scene/SceneObjectBase.mock";

export { TextureBaseMock as TextureBase} from "./Textures/TextureBase.mock";
export { TexturesMock as Textures} from "./Textures/Textures.mock";

export { BlocksMock as Blocks} from "./Blocks.mock";
export { CameraInfoModuleMock as CameraInfoModule} from "./CameraInfo.mock";
export { DiagnosticsMock as Diagnostics} from "./Diagnostics.mock";
export { MultipeerMock as Multipeer} from "./Multipeer.mock";
export { ParticipantsMock as Participants} from "./Participants.mock";
export { TimeMock as Time} from "./Time.mock";
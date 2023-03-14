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

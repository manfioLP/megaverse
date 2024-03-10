export enum AstralObject {
	POLYANETS = "polyanets",
	SOLOONS = "soloons",
	COMETHS = "comeths"
}

export enum SoloonColorEnum {
	BLUE = "blue",
	RED = "red",
	PURPLE = "purple",
	WHITE = "white"
}

export enum ComethDirectionEnum {
	RIGHT = "right",
	UP = "up",
	DOWN = "down",
	LEFT = "left"
}

export interface AstralObjectParams {
	row: number;
	column: number;
	candidateId: string;
}

export type AstralObjectType = AstralObject.SOLOONS | AstralObject.COMETHS | AstralObject.POLYANETS;
export type SoloonsColorsType = SoloonColorEnum.BLUE | SoloonColorEnum.PURPLE | SoloonColorEnum.WHITE | SoloonColorEnum.RED
export type ComethDirectionType = ComethDirectionEnum.RIGHT | ComethDirectionEnum.UP | ComethDirectionEnum.DOWN | ComethDirectionEnum.LEFT

export interface PolyanetsParams extends AstralObjectParams {}
export interface SoloonsParams extends AstralObjectParams { color: SoloonsColorsType }
export interface ComethsParams extends AstralObjectParams { direction: ComethDirectionType }

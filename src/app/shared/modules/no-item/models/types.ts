import { INoRowsOverlayParams } from "ag-grid-community";
import { SvgIcons } from "@ngneat/svg-icon";

export interface EmptyGridParam extends INoRowsOverlayParams {
  message: string;
  icon: SvgIcons;
  width: string;
  height: string;
  color: string
}
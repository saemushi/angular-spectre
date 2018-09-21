import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export const TAB = 9;
export const ENTER = 13;
export const ESCAPE = 27;
export const LEFT_ARROW = 37;
export const UP_ARROW = 38;
export const RIGHT_ARROW = 39;
export const DOWN_ARROW = 40;

export function checkBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
}

import { atom } from 'recoil';

interface HeaderState {
  title?: string;
}

export const headerState = atom<HeaderState>({
  key: 'headerState',
  default: {},
});

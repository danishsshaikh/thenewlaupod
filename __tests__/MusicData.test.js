import {songs} from '.././src/MusicData';

describe('songs', () => {
  it('contains the expected number of songs', () => {
    expect(songs).toHaveLength(6);
  });
});

const retriever = require('./retriever');
/* eslint-env jest */
describe('Retriever', () => {
  test('Word cloud 200', () => {
    expect(() => retriever.getWordCloud('a')).toThrow();
  });

  test('Peers 200', () => {
    expect(() => retriever.getWordCloud('a')).toThrow();
  });

  test('Counts 200', () => {
    expect(() => retriever.getWordCloud('a')).toThrow();
  });

  test('Histogram apm 200', () => {
    expect(() => retriever.getWordCloud('a')).toThrow();
  });

  test('Histogram ping 200', () => {
    expect(() => retriever.getWordCloud('a')).toThrow();
  });

  test('Histogram eff 200', () => {
    expect(() => retriever.getWordCloud('a')).toThrow();
  });

  test('Account info 200', () => {
    expect(() => retriever.getWordCloud('a')).toThrow();
  });

  test('Account summary 200', () => {
    expect(() => retriever.getWordCloud('a')).toThrow();
  });
});

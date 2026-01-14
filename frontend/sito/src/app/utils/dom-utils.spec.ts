import { setNumberInputValueSafe } from './dom-utils';

describe('setNumberInputValueSafe', () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    input = document.createElement('input');
    input.type = 'number';
    input.id = 'test-number';
    document.body.appendChild(input);
  });

  afterEach(() => {
    input.remove();
  });

  it('sets valueAsNumber when given a valid number', () => {
    const ok = setNumberInputValueSafe('#test-number', 42);
    expect(ok).toBe(true);
    expect(input.valueAsNumber).toBe(42);
  });

  it('returns false when element not found', () => {
    expect(setNumberInputValueSafe('#nope', 1)).toBe(false);
  });

  it('clears value when given NaN', () => {
    setNumberInputValueSafe(input, 'not-a-number');
    expect(input.value).toBe('');
  });
});
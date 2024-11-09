import {MiniMaple} from "../src/miniMaple";

test('the most simple expressions', () => {
    maple = MiniMaple()
    expect(maple.differentiate('55')).toBe('0')
    expect(maple.differentiate('x')).toBe('1')
    expect(maple.differentiate('x+3')).toBe('1')
    expect(maple.differentiate('7*x')).toBe('7')
    expect(maple.differentiate('x^3')).toBe('x^2')
})

test('complex expressions', () => {
    maple = MiniMaple()
    expect(maple.differentiate('25*x+2')).toBe('25')
    expect(maple.differentiate('x^5+x^2')).toBe('5*x^4+x')
    expect(maple.differentiate('5-x^10')).toBe('-10*x')
    expect(maple.differentiate('-4*x^2')).toBe('-8*x')
})

test('the most complex expression', () => {
    maple = MiniMaple()
    expect(maple.differentiate('17*x^3-2*x^2+5*x-10')).toBe('51*x^2-4*x+5')
})
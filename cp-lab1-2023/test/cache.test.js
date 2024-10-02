import {Cache} from "../src/cache"

test('initialized cache', () => {
    let c = new Cache()
    let res = c.getStatistics()
    expect(res.length).toBe(0)
});

test('pushing and getting', () => {
    let c = new Cache();
    c.push('cat', 'meu', 6)
    c.push('flat', 37, 2)
    c.push('name', 'Vadim')

    for (let i = 0; i < 6; i++)
    {
        let cat = c.get('cat')
        expect(cat).toBe('meu')
    }
    let cat = c.get('cat')
    expect(cat).toBe(null)

    c.push(3, 'three', 3)
    let sweet = { 'description': 'I am delisious' }
    c.push('goods', sweet)

    expect(c.get('dog')).toBeNull()
    expect(c.get('flat')).toBe(37)
    expect(c.get('flat')).toBe(37)
    expect(c.get('flat')).toBeNull()
    c.push('flat', 37, 5)
    expect(c.get('flat')).toBe(37)
    expect(c.get('name')).toBe('Vadim')
    expect(c.get('name')).toBeNull()
    let g = c.get('goods')
    expect(g).not.toBeNull()
    expect(g).toEqual({ 'description': 'I am delisious' })
    expect(c.get(3)).toBe('three')
});

test('statistics', () => {
    let c = new Cache()
    c.push('country', 'Italy', 10)
    c.push('color', 'green', 4)
    c.push('fruit', 'apple', 3)
    for (let i = 0; i < 5; i++)
    {
        c.get('color')
        c.get('country')
    }
    c.get('fruit')

    let stat = c.getStatistics() //[[]]
    let sum = 0
    for (const s of stat)
    {
        sum += s[2]
    }
    expect(stat).not.toBeNull()
    expect(stat).toContainEqual(['country', 'Italy', 5])
    expect(stat).toEqual([['country', 'Italy', 5], ['fruit', 'apple', 2]])
    expect(stat).toHaveLength(2)
    expect(sum).toBe(7)
});
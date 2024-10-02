class Cache
{
    data
    constructor()
    {
        this.data = new Map()
    }

    push(key, value, q=1)
    {
        this.data.set(key, [value, q])
    }

    get(key)
    {
        let val = this.data.get(key)
        if (val == undefined)
        {
            return null
        }
        else
        {
            if (val[1] == 1)
            {
                this.data.delete(key)
            }
            else
            {
                this.data.set(key, [val[0], val[1] - 1])
            }
            return val[0]
        }

    }

    getStatistics()
    {
        let stat = []
        let i = 0
        for (const [k, v] of this.data)
        {
            stat[i] = [k, v[0], v[1]]
            i += 1
        }
        return stat
    }
}
export {Cache}
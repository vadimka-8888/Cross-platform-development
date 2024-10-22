class MiniMaple{
	constructor()
	{

	}

	function diff(expr, varName) 
	{
		const tokens = findTokens(expr)
		const ast = parse(tokens)
		const diffAst = differentiate(ast, varName)
		const diffExpr = stringify(diffAst)
		return diffExpr
	}

	function findTokens(expr) 
	{
		const tokens = []
		const regex = /[+-]|\*|\^|[a-zA-Z0-9]+/g
		let m;
		while ((m = regex.exec(expr)) !== null) 
		{
			tokens.push(m[0])
		}
		return tokens;
	}

	function parse(tokens) 
	{
		const parseTree = []
		let currentTerm = []
		for (const token of tokens) 
		{
			if (token == '+') 
			{
				parseTree.push(currentTerm)
				currentTerm = [];
			} 
			else if (token == '-') 
			{
				parseTree.push(['-', ...currentTerm])
				currentTerm = []
			} 
			else 
			{
				currentTerm.push(token)
			}
		}
		parseTree.push(currentTerm)
		return parseTree
	}

	function differentiate(tree, varName) 
	{
		const diffAst = []
		for (const term of tree) 
		{
			if (Array.isArray(term)) 
			{
				if (term[0] === '-') 
				{
					diffAst.push(['-', ...differentiateTerm(term.slice(1), varName)])
				} 
				else 
				{
					diffAst.push(differentiateTerm(term, varName))
				}
			} 
			else 
			{
				diffAst.push(differentiateTerm([term], varName))
			}
		}
		return diffAst
	}

	function differentiateTerm(term, varName) 
	{
		if (term.length == 1) 
		{
			if (term[0] == varName) 
			{
			return ['1']
			} 
			else 
			{
			return ['0']
			}
		} 
		else if (term.includes('^')) 
		{
			const varIndex = term.indexOf(varName)
			const base = term[0]
			const e = parseInt(term[varIndex + 2])
			const newE = e - 1
			if (newE == 0) 
			{
				return [base]
			} 
			else 
			{
				return [`${base * e}*${varName}^${newE}`]
			}
		} 
		else if (term.includes('*')) 
		{
			return term[0]
		} 
		else 
		{
			throw new Error(`Unsupported operation: ${term.join('')}`)
		}
	}

	function stringify(ast) 
	{
		let expr = ''
		for (const term of ast) 
		{
			if (Array.isArray(term)) 
			{
				if (term[0] === '-') 
				{
					expr += '-'
				}
				expr += term.slice(1).join('')
			} 
			else 
			{
				expr += term
			}
			expr += ' + '
		}
		return expr.trim().replace(/\+$/, '')
	}
}

export {MiniMaple}
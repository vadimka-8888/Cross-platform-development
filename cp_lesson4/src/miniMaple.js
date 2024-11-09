function Node(content, varName, left, right)
{
	this.content = content
	this.left = left
	this.right = right
	
	let type
	switch(content)
	{
		case '^': 
		case '*':
		case '+':
		case '-':
			type = "operation"
			break
		case varName:
			type = "var"
			break
		default:
			if (Number(content))
			{
				type = "number"
			}
			else type = "other_var"
	}
	this.type = type
}

class Tree
{
	constructor()
	{
		this.priority = {
			'^': 0,
			'*': 1,
			'+': 2,
			'-': 2,
		}
		this.root = undefined
		this.nodes = []
		this.text = ""
		//this.lastUpdatedOperatoin = undefined
	}

	addNode(node)
	{
		this.nodes.push(node)
		if (this.nodes.length == 1)
		{
			this.root = node
		}
		else
		{
			if (this.root.type !== "operation")
			{
				if (node.type !== "operation") alert("error!")
				node.left = this.root
				this.root = node
			}
			else
			{
				if (node.type === "operation")
				{
					let newNodePr = this.priority[node.content]
					if (this.priority[this.root.content] <= newNodePr)
					{
						node.left = this.root
						this.root = node
					}
					else
					{
						let currentNode = this.root
						while (currentNode.right.type === "operation" && this.priority[currentNode.right.content] >= newNodePr)
						{
							currentNode = currentNode.right
						}
						node.left = currentNode.right
						currentNode.right = node
					}
				}
				else
				{
					let currentNode = this.root
					while (currentNode.right !== undefined)
					{
						currentNode = currentNode.right
					}
					currentNode.right = node
				}
			}
		}
	}

	diff()
	{
		if (this.root.type !== "operation")
		{
			this.simpleDiff(this.root)
		}
		else
		{
			let val = this.diffOperation(this.root)
			if (val !== undefined && val !== null)
			{
				let node = new Node("*", this.varName, new Node(String(val), this.varName), this.root)
				this.nodes.push(node)
				this.root = node
			}
		}
	}

	simpleDiff(node)
	{
		if (node == undefined)
		{
			return
		}
		else if (node.type === "var")
		{
			node.content = "1"
			node.type = "number"
		}
		else if (node.type === "number")
		{
			node.content = "0"
		}
	}

	diffOperation(node)
	{
		if (node.content === "+")
		{
			let lNode = node.left
			let rNode = node.right
			let val
			if (lNode.type !== "operation")
			{
				this.simpleDiff(lNode)
			}
			else
			{
				val = this.diffOperation(lNode)
				if (val !== undefined && val !== null)
				{
					let new_node = new Node("*", this.varName, new Node(String(val), this.varName), lNode)
					this.nodes.push(node)
					node.left = new_node
				}
			}
			if (rNode.type !== "operation")
			{
				this.simpleDiff(rNode)
			}
			else
			{
				val = this.diffOperation(rNode)
				if (val !== undefined && val !== null)
				{
					let new_node = new Node("*", this.varName, new Node(String(val), this.varName), rNode)
					this.nodes.push(node)
					node.right = new_node
				}
			}

			if (lNode.content === "0")
			{
				node.left = rNode.left
				node.right = rNode.right
				node.type = rNode.type
				node.content = rNode.content
			}
			else if (rNode.content === "0")
			{
				node.right = lNode.right
				node.left = lNode.left
				node.type = lNode.type
				node.content = lNode.content
			} 
			else if (Number(lNode.content) && Number(rNode.content))
			{
				node.right = undefined
				node.left = undefined
				node.type = "number"
				if (node.content === "+")
				{
					node.content = Number(lNode.content) + Number(rNode.content)
				}
				if (node.content === "-")
				{
					node.content = Number(lNode.content) - Number(rNode.content)
				}
			}
			return null
		}
		else if (node.content === "*")
		{
			let lNode = node.left
			let rNode = node.right
			let val
			if (lNode.type === "operation")
			{
				val = this.diffOperation(lNode)
			}
			if (rNode.type === "operation")
			{
				val = this.diffOperation(rNode)
			}

			if (val === null || val === undefined)
			{
				val = 1
			}

			if (lNode.content === "0" || rNode.content === "0")
			{
				node.left = undefined
				node.right = undefined
				node.type = "number"
				node.content = "0"
			}
			else if (lNode.type === "number" && rNode.type === "number")
			{
				node.right = undefined
				node.left = undefined
				node.type = "number"
				node.content = String(Number(lNode.content) * Number(rNode.content))
			}
			else if (val === 1)
			{ 
				if (lNode.type === "number" && rNode.type === "var")
				{
					node.right = undefined
					node.left = undefined
					node.type = "number"
					node.content = Number(lNode.content) * val
				}
				else if (rNode.type === "number" && lNode.type === "var")
				{
					node.right = undefined
					node.left = undefined
					node.type = "number"
					node.content = Number(rNode.content) * val
				}
			}
			else if (val > 1)
			{
				if (lNode.type === "number" && rNode.type === "operation")
				{
					lNode.content = String(Number(lNode.content) * val)
				}
				else if (rNode.type === "number" && lNode.type === "operation")
				{
					lNode.content = String(Number(rNode.content) * val)
				}
				else if (lNode.type === "number" && rNode.type === "var")
				{
					lNode.content = String(Number(lNode.content) * val)
				}
				else if (rNode.type === "number" && lNode.type === "var")
				{
					rNode.content = String(Number(rNode.content) * val)
				}
			}
			return null
		}
		else if (node.content === "^")
		{
			let lNode = node.left
			let rNode = node.right
			let value = null
			if (lNode.type === "operation")
			{
				this.diffOperation(lNode)
			}
			if (rNode.type === "operation")
			{
				this.diffOperation(rNode)
			}

			if (lNode.content === "0" || rNode.content === "0")
			{
				node.left = undefined
				node.right = undefined
				node.type = "number"
				node.content = "0"
			}
			else if (lNode.type === "number" && rNode.type === "number")
			{
				node.right = undefined
				node.left = undefined
				node.type = "number"
				node.content = Number(lNode.content) ** Number(rNode.content)
			}
			else if (lNode.type === "var" && rNode.type === "number")
			{
				value = Number(rNode.content)
				if (value === 1)
				{
					node.content = "1"
					node.type = "number"
					node.right = undefined
					node.left = undefined
				}
				else if (value === 2)
				{
					node.content = lNode.content
					node.type = lNode.type
					node.right = undefined
					node.left = undefined
				}
				else
				{
					rNode.content = String(value - 1)
				}
				console.log(value)
			}
			return value
		}
	}

	stringify()
	{
		let f = (str) => {
			if (str[0] === "-" && this.text !== "")
			{
				this.text = this.text.slice(0, -1)
			}
			this.text += str
		}
		this.infixTreeTraversal(this.root, f)
		return this.text
	}

	infixTreeTraversal(node, func)
	{
		if (node === undefined)
		{
			return
		}
		this.infixTreeTraversal(node.left, func)
		func(node.content)
		this.infixTreeTraversal(node.right, func)
	}
}

class MiniMaple
{
	constructor()
	{

	}

	differentiate(expression, varName='x')
	{
		this.varName = varName
		let tokens = this.makeTokens(expression)
		let tree = this.makeTree(tokens)

		tree.diff()

		return tree.stringify()
	}

	makeTokens(expr)
	{
		const regex = /[+-]|[0-9]+|\*|\^|[a-zZ-Z]/g
		let m;
		let tokens = []
		while ((m = regex.exec(expr)) != null) 
		{
			tokens.push(m[0])
		}
		let new_tokens = []
		for (let i = 0; i < tokens.length;)
		{
			if (tokens[i] != "-")
			{
				new_tokens.push(tokens[i])
				i++
			}
			else
			{
				if (i != 0)
				{
					new_tokens.push("+")
				}

				if (Number(tokens[i+1]))
				{
					new_tokens.push(tokens[i] + tokens[i+1])
					i += 2
				}
				else
				{
					new_tokens.push(tokens[i] + "1")
					new_tokens.push("*")
					i += 1
				}
			}
		}
		console.log(new_tokens)
		return new_tokens;
	}

	makeTree(tokens)
	{
		let tree = new Tree()
		for (let i = 0; i < tokens.length; i++)
		{
			let node = new Node(tokens[i], this.varName)
			tree.addNode(node)
		}
		return tree
	}
}

export {MiniMaple}
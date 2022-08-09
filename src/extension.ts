import * as vscode from 'vscode';
const isEqual = require("lodash.isequal");
export function activate(context: vscode.ExtensionContext) {
	const stack:string[] = [];
	context.subscriptions.push(vscode.commands.registerCommand('pastestack.copy', () => {
		const editor = vscode.window.activeTextEditor;
		const range = editor?.selection;
		const content = editor?.document.getText(range);
		content && stack.push(content);
		console.log(stack);
		
	}));
	context.subscriptions.push(vscode.commands.registerCommand('pastestack.paste',() => {
		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection as vscode.Selection;
		const range = new vscode.Range(selection.start, selection.end);
		const value = stack.pop();
		if (!value) {
			vscode.window.showInformationMessage('stack is empty');
			return;
		}
		editor?.edit((edit) => {
			if (isEqual(range.start,range.end)) {
				edit.insert(range.start,value);
				return;
			}
			edit.replace(range,value);
		});
	}));
}


// this method is called when your extension is deactivated
export function deactivate() {}

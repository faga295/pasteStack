import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('pastestack.copy', () => {
		const editor = vscode.window.activeTextEditor;
		const range = editor?.selection;
		const stack:string[] = [];
		const content = editor?.document.getText(range);
		content && stack.push(content);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

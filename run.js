import { spawn } from 'child_process'
import cp from 'child_process'
import { promisify } from 'util'
const exec = promisify(cp.exec).bind(cp)
function start(cmd) {
	return spawn(cmd, [], {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc']
	})
}
start('bash')



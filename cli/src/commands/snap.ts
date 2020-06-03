import {Command, flags} from '@oclif/command'
import {StackLint} from '../lib/stacklint'
import * as fs from 'fs'
import * as figures from 'figures'
import * as chalk from 'chalk'
import {DEFAULT_SNAPSHOT_OUTPUT} from '../lib/constant'

export default class Snap extends Command {
  static description = 'Take a snapshot of resources covered in existing workspace'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    out: flags.string({char: 'o', description: 'snapshot output file'}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(Snap)

    try {
      this.log(` ${figures.tick} ${chalk.green.bold('Initializing StackLint')} \n`)

      const out = flags.out || DEFAULT_SNAPSHOT_OUTPUT

      const stackLint = await StackLint.build()
      this.log(` ${figures.tick} ${chalk.green.bold('Retrieving Snapshot')} \n`)

      const snapshots = await stackLint.snap()

      this.log(` ${figures.tick} ${chalk.green.bold('Outputting to ')} ${chalk.blue.bold(out)}\n`)

      fs.writeFileSync(out, JSON.stringify(snapshots))
    } catch (error) {
      this.error(error.toString())
    }
  }
}

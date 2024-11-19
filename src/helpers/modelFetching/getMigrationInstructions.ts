import migration from '@incubateur-ademe/nosgestesclimat/public/migration.json'
import type { Migration } from '@publicodes/tools/migration'
import { importPreviewFile } from './importPreviewFile'

type Props = {
  PRNumber?: string
}
/**
 * This function is used to get the migration instructions. It can be called directly from a server component.
 */
export async function getMigrationInstructions({
  PRNumber,
}: Props = {}): Promise<Migration> {
  if (PRNumber) {
    const fileName = `migration.json`
    return importPreviewFile({ fileName, PRNumber })
  }

  return Promise.resolve(migration)
}

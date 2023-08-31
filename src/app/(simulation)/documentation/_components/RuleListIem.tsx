import { NGCRules } from '@/types/model'
import { encodeRuleName } from '@/utils/publicodes/encodeRuleName'
import Fuse from 'fuse.js'
import Link from 'next/link'
import highlightMatches from '../_helpers/highlightMatches'
import { Matches, SearchItem } from './SearchBar'

export default function RuleListItem({
  rules,
  item,
  matches = undefined,
}: {
  rules: NGCRules
  item: SearchItem
  matches: Fuse.FuseResultMatch[] | undefined
}) {
  return (
    <li
      key={item.dottedName}
      className="my-2 p-2 border-b border-solid border-primaryLight">
      <Link
        href={`/documentation/${encodeRuleName(item.dottedName)}`}
        className="decoration-none">
        <small className="block">
          {item.espace
            .slice(1)
            .reverse()
            .map((name) => (
              <span key={name}>
                {matches
                  ? highlightMatches(
                      name,
                      matches.filter(
                        (m) => m.key === 'espace' && m.value === name
                      ) as Matches
                    )
                  : name}{' '}
                ›{' '}
              </span>
            ))}
          <br />
        </small>
        <span className="mr-2">
          {(rules[item.dottedName] as unknown as { icônes: string })?.icônes}
        </span>
        {matches
          ? highlightMatches(
              item.title,
              matches.filter((m) => m.key === 'title') as Matches
            )
          : item.title}
      </Link>
    </li>
  )
}

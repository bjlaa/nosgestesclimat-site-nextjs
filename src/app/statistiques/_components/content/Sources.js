import { useState } from 'react'

import TransClient from '@/components/translation/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Table from './sources/Table'

export default function Sources(props) {
  const [newWebsites, setNewWebsites] = useState(false)
  const { t } = useClientTranslation()

  return (
    <>
      <Title>
        <TransClient>Origine des visites</TransClient>
      </Title>
      <Tile className="w-full text-left lg:w-1/2">
        {newWebsites ? (
          <Table
            title={t('Sites Web')}
            data={props.websites.filter(
              (website) =>
                !props.oldWebsites.find(
                  (oldWebsite) => oldWebsite.label === website.label
                )
            )}
            total={props.total}
            setNewWebsites={setNewWebsites}
            newWebsites={newWebsites}
          />
        ) : (
          <Table
            title={t('Sites Web')}
            data={props.websites}
            total={props.total}
            limit={5}
            setNewWebsites={setNewWebsites}
            newWebsites={newWebsites}
          />
        )}
        <Table
          title={t('Réseaux Sociaux')}
          data={props.socials}
          total={props.total}
          limit={5}
        />
      </Tile>
    </>
  )
}

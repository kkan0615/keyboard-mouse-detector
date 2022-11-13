import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CContainedBtn from '@/components/commons/buttons/Contained'
import { useElectron } from '@/hooks/electron'
import { UpdateCheckResult } from 'electron-updater'

export const AutoUpdater = () => {
  const { t } = useTranslation()
  const { invoke } = useElectron()

  const [ loading, setLoading ] = useState(false)
  const [ latest, setLatest ] = useState(false)

  const handleCheckForUpdate = async () => {
    setLoading(true)
    const result = await invoke<undefined, UpdateCheckResult | null>('check-update')
    if (result && result.updateInfo.version === APP_VERSION) {
      setLatest(true)
    } else {
      setLatest(false)
    }
    setLoading(false)
  }

  return (
    <div>
      { latest ?
        <div
        >
          { t('commons.messages.latestVersion') }
        </div> :
        <CContainedBtn
          className="tw-py-0.5 px-1"
          onClick={ handleCheckForUpdate }
          loading={ loading }
        >
          { t('commons.buttons.checkForUpdate') }
        </CContainedBtn>
      }
    </div>
  )
}

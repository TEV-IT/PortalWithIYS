import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import IzinlerimPagePageWithLocalizer from './IzinlerimPageWithLocalizer'

const localizer = momentLocalizer(moment)

export default function IzinlerimPage() {
  return <IzinlerimPagePageWithLocalizer localizer={localizer} />
}

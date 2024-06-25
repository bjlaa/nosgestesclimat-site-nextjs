import { SERVER_URL } from '@/constants/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const idSite = 153

const MESURE_START_DATE = '2021-02-01,today'

export const useX = (queryName, urlQuery, transformResult, keepPreviousData) =>
  useQuery(
    queryName,
    () =>
      axios
        .get(
          SERVER_URL +
            '/get-stats?requestParams=' +
            encodeURIComponent(urlQuery)
        )
        .then((res) => transformResult(res)),
    { keepPreviousData }
  )

export const useVisitsChart = ({ chartPeriod, chartDate, name }) => {
  return useX(
    `${name}, ${chartPeriod}, ${chartDate}`,
    `module=API&method=VisitsSummary.getVisits&idSite=${idSite}&date=last${chartDate}&period=${chartPeriod}&format=json`,
    (res) => res.data,
    true
  )
}

export const useSimulationsChart = ({ chartPeriod, chartDate, name }) => {
  return useX(
    `${name}, ${chartPeriod}, ${chartDate}`,
    `module=API&method=Events.getAction&idSite=${idSite}&date=last${chartDate}&period=${chartPeriod}&format=json`,
    (res) => {
      const targets = ['A terminé la simulation', 'Simulation Completed']

      const targetedData = Object.fromEntries(
        Object.entries(res.data).map(([date, evts]) => {
          return [
            date,
            [
              evts.find((evt) => {
                return targets.indexOf(evt.label) > -1
              }),
            ],
          ]
        })
      )

      return targetedData
    },
    true
  )
}

export const useCurrentMonthVisits = () =>
  // `date=lastMonth` doesn't seem to work
  useX(
    'currentMonthVisits',
    `module=API&date=last1&period=month&format=json&idSite=${idSite}&method=VisitsSummary.getVisits`,
    (res) => {
      return Object.values(res.data)[0]
    }
  )

export const useAllTimeVisits = () =>
  useX(
    'allTimeVisits',
    `module=API&&date=${MESURE_START_DATE}&period=range&format=json&idSite=${idSite}&method=VisitsSummary.getVisits`,
    (res) => {
      const base = 109689 //base NGC
      return base + res.data.value
    }
  )

export const useCurrentMonthSimulationsTerminees = () =>
  useX(
    'currentMonthSimulationsTerminees',
    `module=API&method=Events.getAction&idSite=${idSite}&period=month&date=last1&format=JSON`,
    (res) => {
      return Object.values(res.data)[0].find(
        (action) => action.label === 'Simulation Completed'
      ).nb_visits
    },
    true
  )

export const useAllSimulationsTerminees = () =>
  useX(
    'allSimulationsTerminees',
    `module=API&method=Events.getAction&idSite=${idSite}&period=range&&date=${MESURE_START_DATE}&format=JSON`,
    (res) => {
      const base = 32015 //base NGC
      return (
        base +
        res.data
          .filter(
            (action) =>
              action.label === 'A terminé la simulation' ||
              action.label === 'Simulation Completed'
          )
          .reduce((acc, action) => (acc += action.nb_visits), 0)
      )
    },
    true
  )

export const useCurrentMonthWebsites = () =>
  useX(
    'websites',
    `module=API&date=last1&period=month&format=json&idSite=${idSite}&method=Referrers.getWebsites&filter_limit=1000`,
    (res) => {
      return Object.values(res.data)[0]
    }
  )

export const useCurrentMonthSocials = () =>
  useX(
    'socials',
    `module=API&date=last1&period=month&format=json&idSite=${idSite}&method=Referrers.getSocials`,
    (res) => {
      return Object.values(res.data)[0]
    }
  )

export const useGetSharedSimulationEvents = () =>
  useX(
    'sharedSimulation',
    `module=API&method=Events.getCategory&label=partage&idSite=${idSite}&period=range&date=${MESURE_START_DATE}&format=JSON`,
    (res) => res.data[0].nb_visits
  )

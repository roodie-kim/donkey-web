import Moment from 'moment-timezone'

Moment.locale('en')

export default (context, inject) => {
    inject('moment', Moment)
}

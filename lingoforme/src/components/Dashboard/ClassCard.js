import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
// import IconsLingo from '../_common/iconsLingo/iconsLingo'


const ClassCard = ({title, language, classContent, isCancelled, isInvite}) => {
  // const divSelected = isSelected
  // ? { borderLeftColor: 'var(--color-blue)', borderLeftWidth: '4px', borderStyle: 'solid' }
  // : { }
  let styles = theme => ({
    card: {
      display: 'flex',
      flexDirection: 'row'
    },
    details: {
      display: 'flex',
      flexDirection: 'row'
    },
    content: {
      flex: '1 0 auto'
    },
    cover: {
      width: 151,
      height: 151
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    playIcon: {
      height: 38,
      width: 38
    }
  })

  return (
    // <div className='classcard-holder'>
    //   <div className='classcard-invite' />
    //   <div className='classcard-cont-left'>
    //     <h3>{title}</h3>
    //     <div>
    //       <span className='classcard-lang'>
    //         {/* <IconsLingo name={language} /> */}
    //         {language}
    //       </span>
    //       <span className='classcard-content'>
    //         {classContent}
    //       </span>
    //     </div>
    //   </div>
    //   <div className='classcard-cont-right'>
    //     <button>Confirm</button>
    //   </div>
    // </div>

    <Card className={styles.card}>
      <div className={styles.details}>
        <CardContent className={styles.content}>
          <Typography variant="headline">Live From Space</Typography>
          <Typography variant="subheading" color="textSecondary">
            Mac Miller
          </Typography>
          TEST
        </CardContent>
      </div>
    </Card>
  )
}

ClassCard.propTypes = {
  title: PropTypes.string,
  language: PropTypes.string,
  classContent: PropTypes.string,
  isCancelled: PropTypes.bool,
  isInvite: PropTypes.bool
}

export default ClassCard

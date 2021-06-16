import SingleBanner from '../SingleBanner/SingleBanner'

export const QUERY = gql`
  query HomeBannersQuery {
    homeBanners {
      id
      backgroundUrl
      mainText
      mainTextColor
      mainTextFontSize
      subText
      subTextColor
      subTextFontSize
      textPlacement
      button1Link
      button1Text
      button1BackgroundColor
      button1TextColor
      button2Link
      button2Text
      button2BackgroundColor
      button2TextColor
      buttonsVerticalPlacement
      buttonsHorizontalPlacement
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ homeBanners }) => {
  if (homeBanners.length > 0) {
    const banner = homeBanners[0]

    return <SingleBanner banner={banner} />
  }

  return <div />
}

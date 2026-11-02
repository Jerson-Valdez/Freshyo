import chinnyWalking from '../../assets/mascot/Chinny_Walking_768.png'
import chinnyDefault from '../../assets/mascot/Chinny_Default_512.png'
import chinnyThinking from '../../assets/mascot/Chinny_Thinking_320.png'
import chinnySitting from '../../assets/mascot/Chinny_Sitting_320.png'
import chinnyCooking from '../../assets/mascot/Chinny_Cooking_240.png'

type Pose = 'default' | 'walking' | 'thinking' | 'sitting' | 'cooking'

const poseImages: Record<Pose, string> = {
  default: chinnyDefault,
  walking: chinnyWalking,
  thinking: chinnyThinking,
  sitting: chinnySitting,
  cooking: chinnyCooking,
}

export function Chinny({
  pose,
  mobilePose,
  alt = '',
  className,
  loading = 'lazy',
  shadow = 'soft',
}: {
  pose: Pose
    mobilePose?: Pose
  alt?: string
  className: string
  loading?: 'eager' | 'lazy'
  shadow?: 'soft' | 'strong'
}) {
  const shadowClass = shadow === 'strong'
    ? 'drop-shadow-[0_12px_18px_rgba(41,37,36,0.28)]'
    : 'drop-shadow-[0_5px_9px_rgba(41,37,36,0.23)]'
  const image = <img src={poseImages[pose]} alt={alt} className={`${shadowClass} ${className}`} loading={loading} />
  if (!mobilePose) return image

  return <picture className="contents"><source media="(max-width: 639px)" srcSet={poseImages[mobilePose]} />{image}</picture>
}

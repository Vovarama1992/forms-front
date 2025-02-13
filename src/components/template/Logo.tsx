import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface LogoProps extends CommonProps {
    imgClass?: string
    logoWidth?: number | string
}

const Logo = (props: LogoProps) => {
    const { className, imgClass, style, logoWidth = 'auto' } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass}
                src="/img/logo/opticard-logo.svg"
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

export default Logo

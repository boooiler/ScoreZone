import { useState } from "react"

import { TabProps } from "./Tab"

import './styles.scss'

interface Props {
    activeCard?: number
    children: React.ReactElement<TabProps>[]
}
export const TabGroup = ({ children, activeCard = 0 }: Props) => {
  const [active, setActive] = useState<number>(activeCard)

  const getHeaders = (): string[] => {
    return children.map(c => c.props.label)
  }

  const isActive = (index: number): string => {
    return index === active ? 'active' : ''
  }

  return (
    <section className="tab">
      <div className="tab-headers">
        {getHeaders().map((header, index) => 
          <span
            key={header}
            onClick={() => setActive(index)}
            className={`tab-headers--label ${isActive(index)}`}>
            {header}
          </span>
        )}
      </div>

      <div className="tab-content">
        {children[active]}
      </div>
    </section>
  )
}

export default TabGroup
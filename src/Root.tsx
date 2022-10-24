import React, { useEffect, useState } from 'react'
import './Root.scss'

function Root() {
  const [list, setList] = useState<number[]>([])
  const [visionHeight, setVisionHeight] = useState<number>(0)
  const [scrollHeight, setScrollHeight] = useState<number>(0)

  const [startCount, setStartCount] = useState<number>(0)
  const [endCount, setEndCount] = useState<number>(15)
  const [visionList, setVisionList] = useState<number[]>([])
  const [startOffset, setStartOffset] = useState<number>(0)
  const itemCount = 200
  const itemHeight = 80
  // 多加载5个
  const visionCount = Math.ceil(visionHeight / itemHeight)

  useEffect(() => {
    return () => {
      const arr: React.SetStateAction<number[]> = []
      for (let i = 0; i < itemCount; i++) {
        arr.push(i)
      }
      setList(arr)
      const el = document.querySelector('.container')
      if (el) setVisionHeight(el.clientHeight)
      setVisionList(arr.slice(startCount, endCount))
    }
  }, [])

  const handleScroll = (e) => {
    setScrollHeight(e.target.scrollTop)
    setStartCount(Math.floor(scrollHeight / 80))
    setEndCount(startCount + visionCount)
    setVisionList(list.slice(startCount, endCount))
    setStartOffset(scrollHeight - (scrollHeight % itemHeight))
  }

  return (
    <div className="Root">
      <h3 className={'title'}>长列表虚拟滚动实现</h3>
      <div className="container" onScroll={(e) => handleScroll(e)}>
        <div
          className="phantom"
          style={{ height: `${itemHeight * itemCount}px` }}
        />
        <ul
          className={'ul'}
          style={{ transform: `translate3d(0, ${startOffset}px, 0)` }}
        >
          {visionList.map((v) => (
            <li className={'li'} key={v}>
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Root

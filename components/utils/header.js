import React from 'react'
import Nav from './nav'
import ThemeSwitcher from './themeSwitcher'

export default function header() {
  return (
    <div className=' bg-light-primary dark:bg-dark-primary flex justify-around py-6'>
        <h1>Logo</h1>
        <Nav />
        <ThemeSwitcher />
    </div>
  )
}

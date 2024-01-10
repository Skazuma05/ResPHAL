import css from '@/styles/Home.module.css'

export default function Navbar() {
    return (
        <nav className={css.nav}>
            <ul>
                <li><a href="/main_Meet">お肉</a></li>
                <li><a href="/main_Drink">ドリンク</a></li>
            </ul>
        </nav>
    )
}

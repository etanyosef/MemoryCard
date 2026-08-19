import githubIcon from '../assets/icon/github-original.svg'

export default function Footer() {
    return (
        <footer>
            <div>
                <p>
                    Created by: sagicat
                </p>
            </div>
            <div>
                <span>
                    <a href="https://github.com/etanyosef/MemoryCard">
                        <img src={githubIcon} alt="github" />
                    </a>
                </span>
            </div>
        </footer>
    )
}
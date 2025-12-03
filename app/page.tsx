import SinglePlayerSales from './tek-oyunculu/page'

export default function HomePage() {
    // Check env variable to decide between Selection or SinglePlayerSales
    const skipSelection = process.env.NEXT_PUBLIC_SKIP_SELECTION_SCREEN === 'true'

    if (skipSelection) {
        return <SinglePlayerSales />
    }

    // For now, redirect to single player sales (you can create Selection page later)
    return <SinglePlayerSales />
}

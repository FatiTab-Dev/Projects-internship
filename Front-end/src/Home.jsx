import { Carsoul } from './Layout/Carsoul';
import { Cardsshop } from './Layout/Cardsshop';

export const Home = ({ bikes, onAddToCart }) => {
  return (
    <>
    <header>
        <Carsoul />
    </header>
    <main>
        <Cardsshop bikes={bikes} onAddToCart={addToCart => onAddToCart(addToCart)} />
    </main>
    </>
  );
}
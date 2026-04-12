import SectionTitle from '../components/SectionTitle';
import PlayerCard from '../components/PlayerCard';
import { players } from '../lib/data';

export default function JoueursPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          overline="Champions"
          title="Joueurs"
          subtitle="Les meilleurs scrabbleurs francophones d'Afrique"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player, i) => (
            <PlayerCard key={player.id} player={player} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

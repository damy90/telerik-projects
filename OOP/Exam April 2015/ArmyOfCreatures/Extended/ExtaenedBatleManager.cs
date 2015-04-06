namespace ArmyOfCreatures.Extended
{
    using System;
    using System.Linq;
    using ArmyOfCreatures.Logic;
    using ArmyOfCreatures.Logic.Battles;
    using System.Collections.Generic;

    class ExtaenedBatleManager : BattleManager
    {
        //TODO: implement int.Max number of armies

        private readonly List<ICollection<ICreaturesInBattle>> armies;
        //private readonly ICollection<ICreaturesInBattle> thirthArmyCreatures;

        public ExtaenedBatleManager(ICreaturesFactory creaturesFactory, ILogger logger)
            : base(creaturesFactory, logger)
        {
            ///this.thirthArmyCreatures = new List<ICreaturesInBattle>();
            this.armies = new List<ICollection<ICreaturesInBattle>>();
        }

        protected override void AddCreaturesByIdentifier(CreatureIdentifier creatureIdentifier, ICreaturesInBattle creaturesInBattle)
        {
            if (creatureIdentifier == null)
            {
                throw new ArgumentNullException("creatureIdentifier");
            }

            if (creaturesInBattle == null)
            {
                throw new ArgumentNullException("creaturesInBattle");
            }

            if (creatureIdentifier.ArmyNumber >= 3)
            {
                int armyNumber = creatureIdentifier.ArmyNumber;
                if (armies.Capacity < armyNumber)
                {
                    armies.AddRange(new ICollection<ICreaturesInBattle>[armyNumber - armies.Capacity + 1]);
                }

                if (armies[armyNumber] == null)
                {
                    armies[armyNumber] = new List<ICreaturesInBattle>();
                }

                this.armies[armyNumber].Add(creaturesInBattle);
                //this.thirthArmyCreatures.Add(creaturesInBattle);
            }
            else
            {
                base.AddCreaturesByIdentifier(creatureIdentifier, creaturesInBattle);
            }
        }

        protected override ICreaturesInBattle GetByIdentifier(CreatureIdentifier identifier)
        {
            if (identifier == null)
            {
                throw new ArgumentNullException("identifier");
            }

            int armyNumber = identifier.ArmyNumber;
            if (identifier.ArmyNumber >= 3)
            {
                return this.armies[armyNumber].FirstOrDefault(x => x.Creature.GetType().Name == identifier.CreatureType);
                //return this.thirthArmyCreatures.FirstOrDefault(x => x.Creature.GetType().Name == identifier.CreatureType);
            }
            else
            {
                return base.GetByIdentifier(identifier);
            }
        }


    }
}

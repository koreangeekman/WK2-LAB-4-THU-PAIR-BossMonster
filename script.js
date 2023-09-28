const heroStats = [
  {
    name: 'Link',
    damage: 15,
    HP: 100,
    Lvl: 1,
    Gold: 20,
    XP: 12,
    xpMultiplier: 4
  },
  {
    name: 'Zelda',
    damage: 10,
    HP: 100,
    Lvl: 2,
    Gold: 100,
    XP: 20,
    xpMultiplier: 3
  }
]

const bossStats = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1,
  deaths: 0,
  reward: 10
}

const shopItems = {
  potion: 20,
  tingle: 1,
  epona: 500
}



function attackBoss() {
  let heroDamage = 0
  heroStats.forEach(hero => heroDamage += hero.damage)
  bossStats.health -= heroDamage
  if (bossStats.health <= 0) {
    window.alert('You Win, Ganon Leveled UP!')

    bossStats.level++
    bossStats.health = 100 * bossStats.level
    bossStats.deaths++
    heroStats.forEach(hero => {

      hero.Gold += bossStats.reward
      hero.XP += 1 * hero.xpMultiplier
      hero.Lvl = Math.floor(hero.XP / 10)


    })

    drawHero()
    bossStats.reward += 10

    document.getElementById('bossLevel').innerText = bossStats.level
    document.getElementById('bossKills').innerText = bossStats.deaths
    document.getElementById('bossReward').innerText = bossStats.reward
  }
  document.getElementById('bossHealth').innerText = bossStats.health

}

function bossAttacks() {
  // heroStats.forEach(hero => hero.HP -= bossStats.damage)
  const Rng = Math.floor(Math.random() * heroStats.length)
  heroStats[Rng].HP -= bossStats.damage

  if (heroStats[Rng].HP <= 0) {
    heroStats[Rng].HP = 0
  }

  drawHero()
}

function drawHero() {
  const LinkHP = heroStats.find(hero => hero.name == 'Link')
  document.getElementById('linkHP').innerText = LinkHP.HP
  document.getElementById('linkGOLD').innerText = LinkHP.Gold
  document.getElementById('linkLVL').innerText = LinkHP.Lvl
  const ZeldaHP = heroStats.find(hero => hero.name == 'Zelda')
  document.getElementById('zeldaHP').innerText = ZeldaHP.HP
  document.getElementById('zeldaGOLD').innerText = ZeldaHP.Gold
  document.getElementById('zeldaLVL').innerText = ZeldaHP.Lvl
}



function healButton() {
  const LinkHP = heroStats.find(hero => hero.name == 'Link')
  const ZeldaHP = heroStats.find(hero => hero.name == 'Zelda')


  Swal.fire({
    title: 'Who would you like to heal?',
    showConfirmButton: (LinkHP.Gold >= 20),
    showDenyButton: (ZeldaHP.Gold >= 20),
    showCancelButton: true,
    confirmButtonText: 'Link',
    denyButtonText: `Zelda`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */

    if (result.isConfirmed) {
      Swal.fire('Link Healed!', '', 'success')

      LinkHP.HP += 50
      LinkHP.Gold -= 20
      if (LinkHP.HP >= 100) {
        LinkHP.HP = 100
      }




    } else if (result.isDenied) {
      Swal.fire('Zelda Healed', '', 'success')

      ZeldaHP.HP += 50
      ZeldaHP.Gold -= 20
      if (ZeldaHP.HP >= 100) {
        ZeldaHP.HP = 100
      }

    }
  })
}




drawHero()

setInterval(bossAttacks, 1000)
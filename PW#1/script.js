script.js
function showTab(tabId) {
    document.querySelectorAll('.calculator').forEach(calc => calc.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).style.display = 'block';
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function calculate1() {
    const hp = parseFloat(document.getElementById('hp').value);
    const cp = parseFloat(document.getElementById('cp').value);
    const sp = parseFloat(document.getElementById('sp').value);
    const np = parseFloat(document.getElementById('np').value);
    const op = parseFloat(document.getElementById('op').value);
    const wp = parseFloat(document.getElementById('wp').value);
    const ap = parseFloat(document.getElementById('ap').value);

    const total = hp + cp + sp + np + op + wp + ap;
    if (Math.abs(total - 100) > 0.1) {
        document.getElementById('error1').textContent = 'Сума всіх компонентів повинна дорівнювати 100%';
        document.getElementById('error1').style.display = 'block';
        document.getElementById('results1').style.display = 'none';
        return;
    }

    const kpc = 100 / (100 - wp);
    const kpg = 100 / (100 - wp - ap);

    const hc = hp * kpc;
    const cc = cp * kpc;
    const sc = sp * kpc;
    const nc = np * kpc;
    const oc = op * kpc;
    const ac = ap * kpc;

    const hg = hp * kpg;
    const cg = cp * kpg;
    const sg = sp * kpg;
    const ng = np * kpg;
    const og = op * kpg;

    const qpn = 339 * cp + 1030 * hp - 108.8 * (op - sp) - 25 * wp;

const qdn = parseFloat((qpn * 100 / (100 - wp)).toFixed(2));
const qdafn = parseFloat((qpn * 100 / (100 - wp - ap)).toFixed(2));

    document.getElementById('kpc').textContent = kpc.toFixed(2);
    document.getElementById('kpg').textContent = kpg.toFixed(2);

    document.getElementById('dryMass').innerHTML = `
        <p>H<sup>C</sup> = ${hc.toFixed(2)}%</p>
        <p>C<sup>C</sup> = ${cc.toFixed(2)}%</p>
        <p>S<sup>C</sup> = ${sc.toFixed(2)}%</p>
        <p>N<sup>C</sup> = ${nc.toFixed(2)}%</p>
        <p>O<sup>C</sup> = ${oc.toFixed(2)}%</p>
        <p>A<sup>C</sup> = ${ac.toFixed(2)}%</p>
    `;

    document.getElementById('combustibleMass').innerHTML = `
        <p>H<sup>Г</sup> = ${hg.toFixed(2)}%</p>
        <p>C<sup>Г</sup> = ${cg.toFixed(2)}%</p>
        <p>S<sup>Г</sup> = ${sg.toFixed(2)}%</p>
        <p>N<sup>Г</sup> = ${ng.toFixed(2)}%</p>
        <p>O<sup>Г</sup> = ${og.toFixed(2)}%</p>
    `;

    document.getElementById('heatingValue').innerHTML = `
        <p>Q<sup>P</sup><sub>H</sub> = ${(qpn/1000).toFixed(4)} МДж/кг</p>
        <p>Q<sup>C</sup><sub>H</sub> = ${(qdn/1000).toFixed(2)} МДж/кг</p>
        <p>Q<sup>Г</sup><sub>H</sub> = ${(qdafn/1000).toFixed(2)} МДж/кг</p>
    `;

    document.getElementById('error1').style.display = 'none';
    document.getElementById('results1').style.display = 'block';
}

function calculate2() {
  const cg = parseFloat(document.getElementById('cg2').value);
  const hg = parseFloat(document.getElementById('hg2').value);
  const og = parseFloat(document.getElementById('og2').value);
  const sg = parseFloat(document.getElementById('sg2').value);
  const qdaf = parseFloat(document.getElementById('qdaf').value);
  const wr = parseFloat(document.getElementById('wr2').value);
  const ad = parseFloat(document.getElementById('ad2').value);
  const v = parseFloat(document.getElementById('v2').value);


  if ([cg, hg, og, sg, qdaf, wr, ad, v].some(isNaN)) {
      document.getElementById('error2').textContent = 'Будь ласка, заповніть всі поля коректними числовими значеннями';
      document.getElementById('error2').style.display = 'block';
      document.getElementById('results2').style.display = 'none';
      return;
  }


  const total = cg + hg + og + sg;
  if (Math.abs(total - 100) > 0.1) {
      document.getElementById('error2').textContent = 'Сума компонентів горючої маси повинна дорівнювати 100%';
      document.getElementById('error2').style.display = 'block';
      document.getElementById('results2').style.display = 'none';
      return;
  }


  const k = (100 - wr - ad) / 100;

  const cr = cg * k;
  const hr = hg * k;
  const or = og * k;
  const sr = sg * k;
  const ar = ad * (100 - wr) / 100;
  const vr = v * (100 - wr) / 100;

  const qr = qdaf * (100 - wr - ar) / 100;

  document.getElementById('workingMass').innerHTML = `
      <p>H<sup>P</sup> = ${hr.toFixed(2)}%</p>
      <p>C<sup>P</sup> = ${cr.toFixed(2)}%</p>
      <p>S<sup>P</sup> = ${sr.toFixed(2)}%</p>
      <p>O<sup>P</sup> = ${or.toFixed(2)}%</p>
      <p>A<sup>P</sup> = ${ar.toFixed(2)}%</p>
      <p>V<sup>P</sup> = ${vr.toFixed(2)} мг/кг</p>
  `;

  document.getElementById('heatingValue2').innerHTML = `
      <p>Q<sup>P</sup><sub>H</sub> = ${qr.toFixed(2)} МДж/кг</p>
  `;

  document.getElementById('error2').style.display = 'none';
  document.getElementById('results2').style.display = 'block';
}   

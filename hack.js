async function sleep(ms) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

function clickButton(text) {
    let buttons = Array.from(document.querySelectorAll('button'));
    let button = buttons.find((e) => e.innerText.includes(text));
    if (button !== undefined) {
        button.click();
        return true;
    }
    return false;
}

function getQuestionAndAnswers() {
    let main = document.body.querySelector('main');
    let h3 = main.querySelector('h3');
    let title = h3.innerText;
    let block = main.querySelector('div.mb');
    let li = block.querySelectorAll('li');
    let answers = [];
    for (let i of li) {
        answers.push(i.innerText);
    }
    return [title.split('\n').slice(1).join('\n'), answers];
}

function next() {
    clickButton('下一题');
}

function pre() {
    clickButton('上一题');
}

function chooseAnswer(...args) {
    let main = document.body.querySelector('main');
    let block = main.querySelector('div.mb');
    let li = block.querySelectorAll('li');
    for (let i of args) li[i].click();
}

function back() {
    let left = document.body.querySelector('div.left');
    left.click();
}

async function restart() {
    if (clickButton('重做试卷')) {
        await sleep(1000)
        clickButton('确定');
        await sleep(1000)
    } else {
        clickButton('开始考试');
    }
    await sleep(1000)
    clickButton('开始考试');
    await sleep(1000)
    clickButton('确定');
}

async function copyWork() {
    for (let i = 0; i < 100; ++i) {
        pre();
    }

    data = [];
    for (let i = 0; i < 100; ++i) {
        const [q, a] = getQuestionAndAnswers();
        chooseAnswer(0);
        data.push({
            question: q,
            answer: a,
        });
        next();
    }

    let blob = new Blob([JSON.stringify(data, null, 2)]);

    let href = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = href;
    a.download = 'data.json';
    a.click();
    clickButton('交卷');
    await sleep(100);
    clickButton("确定");
    await sleep(100);
}

async function main(){
    await restart();
    await copyWork();
    await back();
}
main()

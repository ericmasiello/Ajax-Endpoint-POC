// this is just a demo function to show how we can import other modules
import { add } from '../utils/math.js';

const computeSum = (rootElement) => () => {
  const nextSum = Array.from(rootElement.querySelectorAll('input')).reduce((sum, inputElement) => {
    return add(sum, inputElement.valueAsNumber || 0);
  }, 0);

  const resultElement = rootElement.querySelector('div');
  resultElement.textContent = nextSum;
};

/*
 * hydrate method is used to decorate loaded JSON html
 * snippet with javascript beheaviors.
 * This demo creates the markup with JavaScript. In practice, you'd probably send the HTML
 * down in the JSON.html payload already created and then just decoreate the HTML
 * with JavaScript behaviors.
 */
export const hydrate = (partialRootElement) => (...values) => {
  const listItems = values.map(value => {
    const listItem = document.createElement('li');
    const input = document.createElement('input');
    input.value = value;
    input.type = 'number';
    listItem.append(input);
    return listItem;
  });

  const result = document.createElement('div');

  const mountElement = partialRootElement.querySelector('[data-name="dynamic-data"]');

  const mountFragement = document.createDocumentFragment();

  const list = document.createElement('ul');
  listItems.forEach((element) => list.append(element));
  mountFragement.append(list);
  mountFragement.append(result);

  const computeHandler = computeSum(mountElement);

  mountElement.append(mountFragement);
  // trigger computeSum on each keyup
  mountElement.addEventListener('keyup', computeHandler);
  // trigger to compute initial value
  computeHandler();
}
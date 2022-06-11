import { Type } from './type';
import { NormalArrow } from './normal-arrow';
import { SelfArrow } from './self-arrow';
import { Transition } from '../type';

interface Props {
  graph: Type.Graph;
  link: Type.Link;
  active: Transition | undefined;
  duration: number;
}

export const Link = (props: Props) => {
  const { graph, link, active, duration } = props;

  const sourceLocation = graph.nodes.find(
    (node) => node.state === link.source.node
  );
  const targetLocation = graph.nodes.find(
    (node) => node.state === link.target.node
  );

  return (
    <>
      {sourceLocation && targetLocation ? (
        sourceLocation === targetLocation ? (
          <SelfArrow
            key={link.source.node + link.target.node}
            link={link}
            sourceLocation={sourceLocation}
            active={
              isActive({ from: active?.from, to: active?.to }, link)
                ? active
                : undefined
            }
            duration={duration}
          />
        ) : (
          <NormalArrow
            key={link.source.node + link.target.node}
            link={link}
            sourceLocation={sourceLocation}
            targetLocation={targetLocation}
            active={
              isActive({ from: active?.from, to: active?.to }, link)
                ? active
                : undefined
            }
            duration={duration}
          />
        )
      ) : null}
    </>
  );
};

const isActive = (
  activeNode: { from?: number; to?: number },
  link: Type.Link
) => {
  return (
    activeNode?.from === link.source.node && activeNode?.to === link.target.node
  );
};
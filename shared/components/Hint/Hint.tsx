import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '..';

type TSide = 'left' | 'right' | 'top' | 'bottom';

interface Props {
  children: React.ReactNode;
  description: string;
  side?: TSide;
  offset?: number;
}

function Hint({ children, description, side = 'bottom', offset = 0 }: Props): JSX.Element {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className='text-xs max-w-[220px] break-words'
          sideOffset={offset}
          side={side}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default Hint;

```jsx
interface ISizeProviderProps {
  containerSize: { width: number; height: number };
}

const withSizeProvider = <P extends ISizeProviderProps>(Comp: React.FC<P>): React.FC<Omit<P, 'containerSize'>> => {
  return (subProps: Omit<P, 'containerSize'>) => {
    const workbenchRef = useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<{ width: number; height: number }>();

    useEffect(() => {
      const container = workbenchRef.current;
      if (!container) {
        return;
      }
      setRect({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    }, []);

    // FIXME: 不这样写会报奇怪的错误
    const props = { ...subProps, containerSize: rect } as P;
    return (
      <Flex.Item flex="auto" className={styles.workbench} ref={workbenchRef}>
        {rect ? <Comp {...props} /> : null}
      </Flex.Item>
    );
  };
};
```
import {
  Box,
  Typography,
  Paper,
  TextField,
  Avatar,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ChatBubbleOutlined, Send } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useComments } from "../../../lib/types/hooks/useComments";
import { timeAgo } from "../../../lib/util/util";
import { useForm, type FieldValues } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useAccounts } from "../../../lib/types/hooks/useAccounts";

const ActivityDetailsChat = observer(function ActivityDetailsChat() {
  const { id } = useParams();
  const { commentStore } = useComments(id);
  const { currentUser } = useAccounts();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const addComment = async (data: FieldValues) => {
    try {
      await commentStore.hubConnection?.invoke("SendComment", {
        activityId: id,
        body: data.body,
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(addComment)();
    }
  };
  return (
    <Paper sx={{ borderRadius: 5, overflow: 'hidden' }}>
      <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <ChatBubbleOutlined color="primary" />
        <Box>
          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>Chat about this event</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'success.main' }} />
            Live · {commentStore.comments.length} messages
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <form onSubmit={handleSubmit(addComment)}>
          <TextField
            {...register("body", { required: true })}
            variant="outlined"
            fullWidth
            multiline
            maxRows={4}
            placeholder="Write a message... (Enter to send, Shift + Enter for new line)"
            onKeyDown={handleKeyPress}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {isSubmitting ? (
                      <CircularProgress size={22} />
                    ) : (
                      <IconButton type="submit" color="primary"><Send /></IconButton>
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
        </form>

        <Box sx={{ maxHeight: 460, overflowY: "auto", mt: 2, pr: 0.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {commentStore.comments.length === 0 && (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No messages yet. Start the conversation!
            </Typography>
          )}
          <AnimatePresence initial={false}>
            {commentStore.comments.map((comment) => {
              const mine = comment.userId === currentUser?.id;
              return (
                <Box
                  key={comment.id}
                  component={motion.div}
                  layout
                  initial={{ opacity: 0, y: -12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  sx={{ display: "flex", gap: 1.5, flexDirection: mine ? 'row-reverse' : 'row', alignItems: 'flex-end' }}
                >
                  <Avatar
                    component={Link}
                    to={`/profiles/${comment.userId}`}
                    src={comment.imageUrl}
                    alt={comment.displayName}
                    sx={{ width: 34, height: 34 }}
                  >
                    {comment.displayName.charAt(0)}
                  </Avatar>
                  <Box sx={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.5, px: 0.5 }}>
                      <Typography
                        component={Link}
                        to={`/profiles/${comment.userId}`}
                        variant="body2"
                        sx={{ fontWeight: 700, textDecoration: "none", color: 'text.primary' }}
                      >
                        {mine ? 'You' : comment.displayName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {timeAgo(comment.createdAt)} ago
                      </Typography>
                    </Box>
                    <Box sx={{
                      px: 2, py: 1.25, borderRadius: 4,
                      borderBottomRightRadius: mine ? 6 : 16,
                      borderBottomLeftRadius: mine ? 16 : 6,
                      bgcolor: mine ? 'primary.main' : 'action.hover',
                      color: mine ? '#fff' : 'text.primary'
                    }}>
                      <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: 'break-word' }}>{comment.body}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </AnimatePresence>
        </Box>
      </Box>
    </Paper>
  );
});
export default ActivityDetailsChat;
